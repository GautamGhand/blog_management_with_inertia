import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Show() {
    const { brief_post } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        comment: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.comment.store', brief_post.id), {
            onSuccess: () => setData('comment', ''),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Post: ${brief_post.title}`} />

            <div className="max-w-2xl mx-auto mt-8">
                <h1 className="text-2xl font-bold">{brief_post.title}</h1>
                <p className="mt-2">{brief_post.description}</p>

                <hr className="my-4" />

                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                <div className="mb-4">
                    {brief_post.comments.length > 0 ? (
                        brief_post.comments.map((comment) => (
                            <div key={comment.id} className="border p-2 mb-2 rounded">
                                <strong>{comment.comment}</strong>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <textarea
                        className="border p-2 rounded w-full"
                        placeholder="Add a comment..."
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                    />
                    <InputError message={errors.comment} />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Comment
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
