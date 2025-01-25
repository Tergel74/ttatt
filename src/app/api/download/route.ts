import { NextResponse } from "next/server";
import youtubeDl from "youtube-dl-exec";
import path from "path";
import os from "os";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        const outputDir = path.join(os.homedir(), "Downloads");
        const ytDlpPath = path.join(process.cwd(), "bin", "yt-dlp");
        console.log(ytDlpPath);
        const ytDlp = youtubeDl.create(ytDlpPath!);

        const options = {
            extractAudio: true,
            format: "bestaudio",
            output: path.join(outputDir, "%(title)s.%(ext)s"),
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:Mozilla/5.0"],
            exec: ytDlpPath,
            audioFormat: "mp3",
            audioQuality: 192,
        };

        const info = await ytDlp(url, {
            getTitle: true,
            getDuration: true,
            noWarnings: true,
            noCheckCertificates: true,
            noOverwrites: true,
        });
        const result = await ytDlp(url, options);

        return NextResponse.json({
            success: true,
            data: {
                result,
                info,
            },
        });
    } catch (error) {
        console.error("Download error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to process download request",
            },
            { status: 500 }
        );
    }
}
