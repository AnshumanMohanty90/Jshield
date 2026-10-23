import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });

    return (
        <div className="min-h-screen bg-slate-950 px-5 py-24">
            <div className="mx-auto max-w-md text-center">
                <h1 className="text-7xl font-light text-slate-300">404</h1>
                <h2 className="mt-4 text-2xl font-medium text-white">Page not found</h2>
                <p className="mt-3 text-slate-400 leading-relaxed text-pretty">
                    The page "{pageName}" could not be found in this application.
                </p>

                {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                    <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                        Admin note: this could mean the page has not been implemented yet.
                    </p>
                )}

                <button
                    onClick={() => { window.location.href = '/'; }}
                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white"
                >
                    Go home
                </button>
            </div>
        </div>
    )
}