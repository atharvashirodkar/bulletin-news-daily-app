
const CURRENTS_API_URL =
    "https://api.currentsapi.services/v1/search";

export async function onRequestGet({ request, env }) {

    // 1. Retrieve the private API key.
    const apiKey = env.CURRENTS_API_KEY;

    if (!apiKey) {
        return Response.json(
            {
                status: "error",
                message: "Currents API key is not configured."
            },
            { status: 500 }
        );
    }

    // 2. Read browser request parameters.
    const requestUrl = new URL(request.url);

    const query = requestUrl.searchParams.get("q")?.trim();

    const page = Number(
        requestUrl.searchParams.get("page") ?? "1"
    );

    // 3. Validate parameters.
    if (!query) {
        return Response.json(
            { status: "error", message: "Search query is required." },
            { status: 400 }
        );
    }

    if (query.length > 500) {
        return Response.json(
            { status: "error", message: "Search query is too long." },
            { status: 400 }
        );
    }

    if (!Number.isInteger(page) || page < 1 || page > 180) {
        return Response.json(
            { status: "error", message: "Invalid page number." },
            { status: 400 }
        );
    }

    // 4. Construct Currents API request.
    const currentsUrl = new URL(CURRENTS_API_URL);

    currentsUrl.searchParams.set("keywords", query);
    currentsUrl.searchParams.set("page_number", String(page));
    currentsUrl.searchParams.set("page_size", "10");
    currentsUrl.searchParams.set("language", "en");

    try {

        // 5. Fetch news using server-side authentication.
        const response = await fetch(currentsUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Accept": "application/json",
                "User-Agent": "BulletinNewsDaily/1.0"
            }
        });

        // 6. Read and return the provider response.
        const data = await response.json();

        return Response.json(data, {
            status: response.status,
            headers: {
                "Cache-Control": "no-store"
            }
        });

    } catch (error) {

        // 7. Handle connection failures.
        return Response.json(
            {
                status: "error",
                message: "Unable to connect to Currents API."
            },
            { status: 502 }
        );
    }
}