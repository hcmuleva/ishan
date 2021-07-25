import S3 from 'react-aws-s3';
import aws  from './keys';
const config = {
	accessKeyId: aws.accessKeyId,
	secretAccessKey: aws.secretAccessKey,
	region: aws.region,
	dirName: aws.dirName,
	bucketName: aws.bucketName
}


const uploadS3File = async (file, fileName, container) => {
	const ReactS3Client = new S3(config);
	if(container){
        config['dirName'] = container;
    }else {
        config['dirName'] =  "seervi";
    }
    
	try {
		const data = await ReactS3Client.uploadFile(file,fileName)
		console.log("From upload service , data url afrer upload",data.location)
		return data.location
	} catch (err) {
		throw new Error('Error in uploading content');
	}
}

export {
	uploadS3File,
};
