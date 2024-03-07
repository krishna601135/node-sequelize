if [ -f "container-scan-result.txt" ]; then
    echo "Container scanning failed. Skipping deployment."
else
    echo "No vulnerabilities found. Deploying image..."

    # Give permission to pem file
    chmod 400 pem

    # Connect to dev server using SSH
    ssh -i pem user@dev-server

    # Login to Amazon ECR (Elastic Container Registry)
    aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com

    # Remove previous running containers (if necessary)
    # docker stop <container-name>
    # docker rm <container-name>

    # Pull the image from Amazon ECR
    docker pull your-account-id.dkr.ecr.your-region.amazonaws.com/your-image

    # Run the container
    # docker run -d -p 80:80 your-account-id.dkr.ecr.your-region.amazonaws.com/your-image
fi




