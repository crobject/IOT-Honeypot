DELIMITER //
DROP PROCEDURE IF EXISTS RequestByDay;
USE Honeypot;
CREATE PROCEDURE RequestByDay()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS AccessDate_Formatted;
	CREATE TEMPORARY TABLE AccessDate_Formatted SELECT AccessDate, DATE_FORMAT(FROM_UNIXTIME(AccessDate),GET_FORMAT(DATE,'USA')) as DateFormatted FROM Logs GROUP by AccessDate;
    SELECT SUBSTRING_INDEX(DateFormatted, '.',2) as date, count(DateFormatted) as requests From AccessDate_Formatted GROUP by date;
END //

DELIMITER ;