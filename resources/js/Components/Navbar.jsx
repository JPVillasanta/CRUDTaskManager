import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage();

    function linkClass(path) {
        const isActive =
            path === '/'
                ? url === '/'
                : url.startsWith(path);

        return isActive
            ? 'rounded bg-blue-600 px-3 py-2 text-white'
            : 'rounded px-3 py-2 text-slate-700 hover:bg-slate-200';
    }

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <Link
                    href="/"
                    className="text-xl font-bold text-blue-600"
                >
                    CRUD Task Manager
                </Link>

                <div className="flex gap-2">
                    <Link href="/" className={linkClass('/')}>
                        Home
                    </Link>

                    <Link
                        href="/tasks"
                        className={linkClass('/tasks')}
                    >
                        Tasks
                    </Link>
                </div>
            </div>
        </nav>
    );
}