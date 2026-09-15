import Navbar from '../../Components/Navbar';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tasks }) {
    const [editingTask, setEditingTask] = useState(null);

    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        title: '',
        description: '',
        status: 'pending',
        due_date: '',
    });

    function submitForm(event) {
        event.preventDefault();

        if (editingTask) {
            patch(`/tasks/${editingTask.id}`, {
                preserveScroll: true,
                onSuccess: () => cancelEditing(),
            });

            return;
        }

        post('/tasks', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    function selectTaskForEditing(task) {
        setEditingTask(task);
        clearErrors();

        setData({
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            due_date: task.due_date ?? '',
        });
    }

    function cancelEditing() {
        setEditingTask(null);
        clearErrors();
        reset();
    }

    function deleteTask(task) {
        const confirmed = window.confirm(
            `Delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/tasks/${task.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                if (editingTask?.id === task.id) {
                    cancelEditing();
                }
            },
        });
    }

    function displayStatus(status) {
        if (status === 'in_progress') {
            return 'In Progress';
        }

        if (status === 'completed') {
            return 'Completed';
        }

        return 'Pending';
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="p-6">
                <div className="mx-auto max-w-5xl">
                    <h1 className="mb-6 text-3xl font-bold text-slate-800">
                        Task Manager
                    </h1>

                    <form
                        onSubmit={submitForm}
                        className="mb-8 rounded-lg bg-white p-6 shadow"
                    >
                        <h2 className="mb-4 text-xl font-semibold">
                            {editingTask ? 'Edit Task' : 'Create Task'}
                        </h2>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(event) =>
                                    setData('title', event.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(event) =>
                                    setData(
                                        'description',
                                        event.target.value
                                    )
                                }
                                className="w-full rounded border p-2"
                                rows="3"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="mb-4 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(event) =>
                                        setData(
                                            'status',
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="in_progress">
                                        In Progress
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(event) =>
                                        setData(
                                            'due_date',
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                />

                                {errors.due_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.due_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingTask
                                    ? 'Update Task'
                                    : 'Create Task'}
                            </button>

                            {editingTask && (
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="rounded bg-slate-500 px-4 py-2 text-white"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <section className="overflow-hidden rounded-lg bg-white shadow">
                        <h2 className="border-b p-4 text-xl font-semibold">
                            Task List
                        </h2>

                        {tasks.length === 0 ? (
                            <p className="p-6 text-slate-500">
                                No tasks have been created.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-200">
                                        <tr>
                                            <th className="p-3">Title</th>
                                            <th className="p-3">Description</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Due Date</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tasks.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="border-t"
                                            >
                                                <td className="p-3 font-medium">
                                                    {task.title}
                                                </td>

                                                <td className="p-3">
                                                    {task.description || '—'}
                                                </td>

                                                <td className="p-3">
                                                    {displayStatus(task.status)}
                                                </td>

                                                <td className="p-3">
                                                    {task.due_date || '—'}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                selectTaskForEditing(
                                                                    task
                                                                )
                                                            }
                                                            className="rounded bg-amber-500 px-3 py-1 text-white"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteTask(task)
                                                            }
                                                            className="rounded bg-red-600 px-3 py-1 text-white"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>  
    );
}