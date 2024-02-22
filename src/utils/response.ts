const className = 'ApiResponse'

class ApiResponse {
    async send (req, res, data, message = "") {
        const result = {
            message,
            data: {data}
        }
        console.log({
            className,
            result,
            'description': "Api Success Response"
        })

        // need to add save functionality
        // const saveAuditObj =  {
        //     request: JSON.stringify(req.body),
        //     reponse: JSON.stringify(result),
        //     request_url: req.url,
        //     request_time: Date.now(),
        //     created_by: "RLCC",
        // }

        // saving audit obj
        // await auditService.saveAudit(saveAuditObj);
        res.status(200).json(result);
    }

    async error (req, res, data, message = "") {
        const result = {
            message,
            data
        }
        console.log({
            className,
            result,
            'description': "Api Failure Response"
        })

        // audit ObJ 
        // const saveAuditObj =  {
        //     request: JSON.stringify(req.body),
        //     reponse: JSON.stringify(result),
        //     requestUrl: req.url,
        //     requestTime: Date.now(),
        //     createdBy: "RLCC",
        // }

        // saving audit obj
        // await auditService.saveAudit(saveAuditObj);
        res.status(400).json(result);
    }
}

export const response = new ApiResponse();
