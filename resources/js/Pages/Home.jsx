import { Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="mx-auto max-w-5xl p-6">
                <section className="rounded-lg bg-white p-8 shadow">
                    <h1 className="mb-3 text-4xl font-bold text-slate-800">
                        Welcome to CRUD Task Manager
                    </h1>

                    <p className="mb-6 text-slate-600">
                        Create, view, update, and delete your tasks.
                    </p>

                    <Link
                        href="/tasks"
                        className="inline-block rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        Open Task Manager
                    </Link>
                </section>
            </main>
        </div>
    );
}