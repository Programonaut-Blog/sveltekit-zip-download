import JSZip from 'jszip';

export async function get({ url }) {
    const imgurl = url.searchParams.get('img');

    const zip = new JSZip();
    const image = await (await fetch(imgurl)).arrayBuffer();

    zip.file('image.png', image);

    let gen = await zip.generateAsync({ type: 'uint8array'})

    return {
        status: 200,
        headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachement; filename=dummy.zip"
        },
        body: gen
    }
}

export async function post({ request }) {
    const data = JSON.parse((await request.body.read()).toString());

    const zip = new JSZip();
    const image = await (await fetch(data.img)).arrayBuffer();

    zip.file('image.png', image);

    let gen = await zip.generateAsync({ type: 'uint8array'})

    return {
        status: 302,
        headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachement; filename=dummy.zip"
        },
        body: gen
    }
}