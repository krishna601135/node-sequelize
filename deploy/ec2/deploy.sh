if [ -f "container-scan-result.txt" ]; then
    echo "vulnerabilities found. Skipping deployment."
else
    echo "No vulnerabilities found. Deploying image..."

    # Give permission to pem file
    chmod 400 $UBUNTU_KEYPAIR

    # Connect to dev server using SSH
    ssh -i UBUNTU_KEYPAIR ubuntu@3.91.229.191

    #login into root user
    sudo -i

    # Login to Amazon ECR (Elastic Container Registry)
    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 680866457108.dkr.ecr.us-east-1.amazonaws.com
    
    # Remove previous running containers (if necessary)
    docker container prune -f

    # Pull the image from Amazon ECR
    docker pull 680866457108.dkr.ecr.us-east-1.amazonaws.com/library:latest

    # Run the container
    docker run -d -p 5000:4001 680866457108.dkr.ecr.us-east-1.amazonaws.com/library:latest
fi




