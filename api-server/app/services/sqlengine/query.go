package sqlengine

type Query struct {
	DataSet   interface{}
	Condition interface{}
	Args      []interface{}
	Pagination
}

type Pagination struct {
	PerPage int64
	PageNo  int64
}
