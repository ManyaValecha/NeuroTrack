import { BlobServiceClient } from '@azure/storage-blob';

const account = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT;
const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;
const containerName = import.meta.env.VITE_AZURE_STORAGE_CONTAINER || 'clinical-records';

export const isStorageConfigured = () => {
    return !!(account && sasToken);
};

export const uploadToDataLake = async (fileName: string, content: string | Blob) => {
    if (!isStorageConfigured()) {
        console.warn("Azure Data Lake not configured. Skipping upload.");
        return;
    }

    try {
        const blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net?${sasToken}`
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        await blockBlobClient.upload(content, typeof content === 'string' ? content.length : content.size);
        console.log(`File ${fileName} uploaded to Data Lake.`);
    } catch (error) {
        console.error("Error uploading to Data Lake:", error);
        throw error;
    }
};
export const listClinicalRecords = async () => {
    if (!isStorageConfigured()) return [];

    try {
        const blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net?${sasToken}`
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const records = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            if (blob.name.endsWith('.json')) {
                const blobClient = containerClient.getBlobClient(blob.name);
                const downloadResponse = await blobClient.download();
                const body = await streamToString(downloadResponse.readableStreamBody);
                records.push(JSON.parse(body));
            }
        }
        return records;
    } catch (error) {
        console.error("Error listing records from Data Lake:", error);
        return [];
    }
};

async function streamToString(readableStream: any) {
    return new Promise<string>((resolve, reject) => {
        const chunks: any[] = [];
        readableStream.on("data", (data: any) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}
