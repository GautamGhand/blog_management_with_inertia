import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Post" />

            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

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
                    {processing ? "Saving..." : "Create Post"}
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
