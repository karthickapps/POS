const SUCCESS = "SUCCESS";

const FAILED = "FAILED";

const getJsonResponse = (payload, errorCode = 0, status = SUCCESS, message = "" ) => {
	const res = {};
	res.payload = payload;
	res.errorCode = errorCode;
	res.status = status;
	res.message = message;

	return res;
};

module.exports = {
	SUCCESS,
	FAILED,
	getJsonResponse,
	getJsonErrorResponse : (errorCode, message = "") => 
		getJsonResponse({}, errorCode, FAILED, message)
}