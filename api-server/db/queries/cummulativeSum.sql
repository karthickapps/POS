-- http://www.sqlteam.com/article/calculating-running-totals
-- https://stackoverflow.com/questions/26491230/sqlite-query-results-into-a-temp-table
-- https://stackoverflow.com/questions/2978700/calculate-running-total-in-sqlite-table-using-triggers
-- [SQL server performance]
-- https://sqlperformance.com/2012/07/t-sql-queries/running-totals
SELECT id, paid_to_vendor, vendor_id, COALESCE((SELECT SUM(paid_to_vendor) 
                      FROM receivings b 
                      WHERE b.id <= a.id) ,0)
                         AS RunningTotal
FROM receivings a
where RunningTotal < 990
ORDER BY id



-- https://explainextended.com/2009/10/23/mysql-order-by-limit-performance-late-row-lookups/