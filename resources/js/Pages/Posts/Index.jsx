import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Posts() {
    const { posts } = usePage().props; // Assuming posts is a paginated collection
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            destroy(`/posts/${id}/delete`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            <div className="p-4">
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex mb-4">
                    <NavLink
                        href={route("posts.create")}
                        active={route().current("posts.create")}
                    >
                        Create Post
                    </NavLink>
                </div>

                <h1 className="text-xl font-bold mb-4">All Posts</h1>

                <table className="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">
                                Title
                            </th>
                            <th className="border border-gray-400 px-4 py-2">
                                Author Name
                            </th>
                            <th className="border border-gray-400 px-4 py-2">
                                Content
                            </th>
                            <th className="border border-gray-400 px-4 py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data && posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <tr key={post.id}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {post.title}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {post.user.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {post.description}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 space-x-2">
                                        {post.can_update && (
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>
                                        )}

                                        {post.can_delete && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(post.id)
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <Link
                                            href={`/posts/${post.id}/show`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Brief
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-4 text-gray-600"
                                >
                                    No Posts Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Links */}
                {posts.links && (
                    <div className="mt-4 flex justify-center space-x-2">
                        {posts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? "#"}
                                className={`px-3 py-1 border rounded ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
