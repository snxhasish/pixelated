"use client";

export default function UploadTest() {
    return (
        <form
            action="/api/media/upload"
            method="POST"
            encType="multipart/form-data"
        >
            <input
                type="file"
                name="file"
                accept="image/png,image/jpeg,image/webp"
            />
            <button type="submit">upload</button>
        </form>
    )
}
