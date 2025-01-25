import { NextResponse } from "next/server";
import youtubeDl from "youtube-dl-exec";
import path from "path";
import os from "os";
import fs from "fs";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        // Source path where yt-dlp is stored in your project
        const ytDlpSourcePath = path.join(
            process.cwd(),
            "public",
            "bin",
            "yt-dlp"
        );

        // Destination path where yt-dlp will be copied (writable directory)
        const ytDlpTempPath = path.join("/tmp", "yt-dlp");

        // Copy the binary to the temporary writable directory
        fs.copyFileSync(ytDlpSourcePath, ytDlpTempPath);

        // Make sure the binary is executable
        fs.chmodSync(ytDlpTempPath, 0o755);

        const outputDir = path.join(os.homedir(), "Downloads");
        // const ytDlpPath = path.join(process.cwd(), "tmp", "bin", "yt-dlp");
        // fs.chmodSync(ytDlpPath, "755");
        const ytDlp = youtubeDl.create(ytDlpTempPath!);

        const options = {
            extractAudio: true,
            format: "bestaudio",
            output: path.join(outputDir, "%(title)s.%(ext)s"),
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:Mozilla/5.0"],
            exec: ytDlpTempPath,
            audioFormat: "mp3",
            audioQuality: 192,
            compatOptions: ["no-python"],
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
