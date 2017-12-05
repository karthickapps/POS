const SUCCESS = "SUCCESS";

const FAILED = "FAILED";

module.exports = {
	SUCCESS,
	FAILED,
	getJsonResponse: (payload, errorCode = 0, status = SUCCESS ) => {
		return {
			payload,
			errorCode,
			status
		}
	},
	getJsonErrorResponse : (errorCode) => {
		return {
			payload: {},
			errorCode,
			status: FAILED
		}
	}
}