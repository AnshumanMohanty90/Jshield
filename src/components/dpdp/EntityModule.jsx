import React, { useState, useMemo } from "react";
import { useEntity } from "@/hooks/useEntity";
import { PageHeader, EmptyState, StatCard } from "@/components/dpdp/Shell";
import { RiskBadge, SeverityBadge, StatusBadge, PriorityBadge } from "@/components/dpdp/Badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Search, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGE_FIELDS = ["risk_level", "severity", "status", "priority"];

function renderCell(row, col) {
  const value = row[col.key];
  if (col.render) return col.render(row);
  if (col.badge) {
    if (col.key === "risk_level") return <RiskBadge level={value} score={row.risk_score} />;
    if (col.key === "severity") return <SeverityBadge severity={value} />;
    if (col.key === "status") return <StatusBadge status={value} />;
    if (col.key === "priority") return <PriorityBadge priority={value} />;
  }
  if (col.type === "boolean") return value ? <span className="text-emerald-600 text-xs font-medium">Yes</span> : <span className="text-slate-400 text-xs">No</span>;
  if (col.type === "date") return value ? new Date(value).toLocaleDateString() : <span className="text-slate-400">—</span>;
  if (col.type === "datetime") return value ? new Date(value).toLocaleString() : <span className="text-slate-400">—</span>;
  if (col.type === "number") return value?.toLocaleString?.() ?? value;
  if (!value && value !== 0) return <span className="text-slate-400">—</span>;
  return <span className="text-slate-700">{value}</span>;
}

function FieldInput({ field, value, onChange }) {
  const common = "w-full";
  if (field.type === "select") {
    return (
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger className={common}><SelectValue placeholder={field.placeholder || "Select…"} /></SelectTrigger>
        <SelectContent>
          {field.options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-2 pt-1">
        <Switch checked={!!value} onCheckedChange={onChange} />
        <span className="text-sm text-slate-600">{value ? "Yes" : "No"}</span>
      </div>
    );
  }
  if (field.type === "textarea") {
    return <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={field.placeholder} />;
  }
  if (field.type === "number") {
    return <Input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} placeholder={field.placeholder} />;
  }
  if (field.type === "date") {
    return <Input type="date" value={value ? value.slice(0, 10) : ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  }
  if (field.type === "datetime") {
    return <Input type="datetime-local" value={value ? value.slice(0, 16) : ""} onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : "")} />;
  }
  return <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
}

export default function EntityModule({ entityName, title, subtitle, icon: Icon, columns, formFields, extraStats }) {
  const { items, loading, create, update, remove } = useEntity(entityName);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((row) =>
      columns.some((c) => String(row[c.key] ?? "").toLowerCase().includes(q))
    );
  }, [items, search, columns]);

  const openCreate = () => {
    setEditing(null);
    const init = {};
    formFields.forEach((f) => { init[f.key] = f.default !== undefined ? f.default : (f.type === "boolean" ? false : f.type === "number" ? "" : ""); });
    setForm(init);
    setDialogOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const init = {};
    formFields.forEach((f) => { init[f.key] = row[f.key] ?? ""; });
    setForm(init);
    setDialogOpen(true);
  };

  const submit = async () => {
    setSaving(true);
    try {
      const payload = { ...form };
      formFields.forEach((f) => {
        if (f.type === "number" && payload[f.key] === "") payload[f.key] = 0;
      });
      if (editing) await update(editing.id, payload);
      else await create(payload);
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (window.confirm(`Delete this ${entityName.toLowerCase()} record? This cannot be undone.`)) {
      await remove(row.id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 space-y-6">
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" /> Add Record
          </Button>
        }
      />

      {extraStats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {extraStats(items).map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} icon={s.icon} tone={s.tone} />
          ))}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records…"
              className="pl-9"
            />
          </div>
          <span className="text-xs text-slate-500">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Inbox} title="No records yet" description="Add your first record to start operationalizing this module." action={<Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Record</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  {columns.map((c) => (
                    <th key={c.key} className={cn("px-4 py-3 font-medium whitespace-nowrap", c.className)}>{c.label}</th>
                  ))}
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                    {columns.map((c) => (
                      <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>
                        {renderCell(row, c)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Record" : `New ${title}`}</DialogTitle>
            <DialogDescription>{editing ? "Update the fields below." : "Fill in the details to create a new record."}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            {formFields.map((f) => (
              <div key={f.key} className={cn("space-y-1.5", (f.type === "textarea" || f.type === "boolean") && "sm:col-span-2")}>
                <Label className="text-sm font-medium text-slate-700">{f.label}{f.required !== false && <span className="text-rose-500"> *</span>}</Label>
                <FieldInput field={f} value={form[f.key]} onChange={(v) => setForm((p) => ({ ...p, [f.key]: v }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={submit} disabled={saving} className="gap-2">
              {saving && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
              {editing ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}