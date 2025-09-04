import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const postData = usePage().props.post;

    const { data, setData, put, processing, errors } = useForm({
        title: postData.title || "",
        description: postData.description || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("posts.update", postData.id)); // Use put for updating
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Post" />

            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <TextInput
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="border px-3 py-2 w-full"
                    />
                    <InputError message={errors.title} />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border px-3 py-2 w-full"
                    />
                    <InputError message={errors.description} />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {processing ? "Saving..." : "Update Post"}
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
