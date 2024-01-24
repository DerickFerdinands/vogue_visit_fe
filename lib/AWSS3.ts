import AWS from 'aws-sdk';

const S3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const  uploadToS3 = async (selectedFile:any, setUploadStatus:any)=>{
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `uploads/${Date.now().toString()}-${selectedFile.name}`,
        Body: selectedFile,// Set appropriate ACL for your use case
    };
    try {
        // @ts-ignore
        const upload =  S3.upload(params);

        upload.on('httpUploadProgress', (progress) => {
            const { loaded, total } = progress;
            const percentage = Math.round((loaded / total) * 100);
            console.log(`Uploading: ${percentage}% complete`);
            setUploadStatus(percentage)
        });

        const data = await upload.promise()

        console.log('File uploaded successfully:', data.Location);
        return data.Location;
    } catch (error) {
        console.error('Error uploading file:', error);
        return error;
    }

}

