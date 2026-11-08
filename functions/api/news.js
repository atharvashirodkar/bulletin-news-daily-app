
const NEWS_API_URL = "https://newsapi.org/v2/everything";

export async function onRequestGet({ request, env }) {

    // 1. Get the secret API key from the environment.
    const apiKey = env.NEWS_API_KEY;

    if (!apiKey) {
        return Response.json(
            { status: "error", message: "News API key is not configured." },
            { status: 500 }
        );
    }

    // 2. Read query parameters from the browser request.
    const requestUrl = new URL(request.url);

    const query = requestUrl.searchParams.get("q")?.trim();
    const page = Number(requestUrl.searchParams.get("page") ?? "1");

    // 3. Validate incoming parameters.
    if (!query) {
        return Response.json(
            { status: "error", message: "A search query is required." },
            { status: 400 }
        );
    }

    if (query.length > 500) {
        return Response.json(
            { status: "error", message: "Search query is too long." },
            { status: 400 }
        );
    }

    if (!Number.isInteger(page) || page < 1) {
        return Response.json(
            { status: "error", message: "Invalid page number." },
            { status: 400 }
        );
    }

    // 4. Construct the NewsAPI request.
    const newsUrl = new URL(NEWS_API_URL);

    newsUrl.searchParams.set("q", query);
    newsUrl.searchParams.set("page", String(page));
    newsUrl.searchParams.set("pageSize", "10");

    try {

        // 5. Request news using the private API key.
        const newsResponse = await fetch(newsUrl, {
            headers: {
                "X-Api-Key": apiKey,
                "Accept": "application/json",
                "User-Agent": "BulletinNewsDaily/1.0"
            }
        });

        const newsData = await newsResponse.json();

        // 6. Return NewsAPI's response to the browser.
        return Response.json(newsData, {
            status: newsResponse.status,
            headers: {
                "Cache-Control": "no-store"
            }
        });

    } catch (error) {

        // 7. Handle network or response errors.
        return Response.json(
            {
                status: "error",
                message: "Unable to connect to the news provider."
            },
            { status: 502 }
        );
    }
}
