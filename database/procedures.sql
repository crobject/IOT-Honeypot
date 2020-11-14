DELIMITER //
DROP PROCEDURE IF EXISTS RequestByDay;
USE Honeypot;
CREATE PROCEDURE RequestByDay()
BEGIN
DROP TEMPORARY TABLE IF EXISTS AccessDate_Formatted;
CREATE TEMPORARY TABLE AccessDate_Formatted SELECT AccessDate as DateFormatted FROM Logs GROUP by AccessDate;
SELECT SUBSTRING_INDEX(DateFormatted, ' ',2) as date, count(DateFormatted) as requests From AccessDate_Formatted GROUP by date;
END //
DELIMITER;

DELIMITER //
    DROP PROCEDURE IF EXISTS RequestByDayHTTP;
    USE Honeypot;
    CREATE PROCEDURE RequestByDayHTTP()
    BEGIN
        DROP TEMPORARY TABLE IF EXISTS AccessDate_Formatted;
        CREATE TEMPORARY TABLE AccessDate_Formatted SELECT ReqTime, DATE_FORMAT(FROM_UNIXTIME(ReqTime),GET_FORMAT(DATE,'USA')) as DateFormatted FROM HTTPRequests;
        SELECT SUBSTRING_INDEX(DateFormatted, '.',2) as date, count(DateFormatted) as requests From AccessDate_Formatted GROUP by date;
    END //
DELIMITER ;