<?php
namespace retrocode\sqlite;

class _sqlite3Db extends \SQLite3
{
    function __construct($fileName)
    {
        $this->open($fileName);
    }
}

class sqliteDB
{
    private $sqliteResult;
    private $error = '';
    /*初始化创建数据表*/
    private $createPushTable       = 'CREATE TABLE PUSH
        ( ID        INTEGER  PRIMARY KEY AUTOINCREMENT,
          TITLE     TEXT             NOT NULL,
          CONTENT   TEXT             NOT NULL,
          PAYLOAD   TEXT             NOT NULL,
          READ      INT              NOT NULL,
          IS_DELETE INT              NOT NULL,
          TIMESTAMP INT              NOT NULL);

                                     CREATE TABLE CLIENT
        ( ID        INTEGER  PRIMARY KEY AUTOINCREMENT,
          CID       TEXT             NOT NULL,
          TIMESTAMP INT              NOT NULL);';

    function __construct($fileName)
    {
        if (file_exists($fileName)) {
            //如果有数据库，则打开数据库
            $this->sqliteResult = new _sqlite3Db($fileName);
            if (!$this->sqliteResult) {
                die("Database error：" . $this->sqliteResult->lastErrorMsg());
            }
        } else {
            //如果没有数据库，则创建数据库，并且生成数据表及插入数据
            $this->sqliteResult = new _sqlite3Db($fileName);
            if (!$this->sqliteResult) {
                die("Database error：" . $this->sqliteResult->lastErrorMsg());
            }
            $this->execute($this->createPushTable);
        }
    }
    function add($title, $content, $payload)
    {
        $time = time();
        $stmt = $this->sqliteResult->prepare("INSERT INTO PUSH (TITLE,CONTENT,PAYLOAD,READ,IS_DELETE,TIMESTAMP) VALUES (:title, :content, :payload, 0, 0, :ctime);");
        $stmt->bindValue(':title', $title, SQLITE3_TEXT);
        $stmt->bindValue(':content', $content, SQLITE3_TEXT);
        $stmt->bindValue(':payload', $payload, SQLITE3_TEXT);
        $stmt->bindValue(':ctime', $time, SQLITE3_INTEGER);
        return $stmt->execute();
    }

    function addcid($cid)
    {
        $time = time();
        $stmt = $this->sqliteResult->prepare("INSERT INTO CLIENT (CID,TIMESTAMP) VALUES (:cid, :ctime);");
        $stmt->bindValue(':cid', $cid, SQLITE3_TEXT);
        $stmt->bindValue(':ctime', $time, SQLITE3_INTEGER);
        return $stmt->execute();
    }

    function getcid()
    {
        $stmt = $this->sqliteResult->prepare("SELECT * FROM CLIENT ORDER BY ID DESC LIMIT 1;");
        $cidList = $this->fetchArray($stmt->execute());
        if(count($cidList)>0){
            return $cidList[0]['CID'];
        } else {
            return '';
        }
    }

    function fakedel($id)
    {
        $sqliteDelete = "UPDATE PUSH SET IS_DELETE = 1 WHERE ID = '$id';";
        return $this->execute($sqliteDelete);
    }

    function realdel($id)
    {
        $sqliteDelete = "DELETE FROM PUSH WHERE ID = '$id';";
        return $this->execute($sqliteDelete);
    }

    function toread($id)
    {
        $sqliteUpdata = "UPDATE PUSH SET READ = 1 WHERE IS_DELETE = 0 AND ID = '$id';";
        return $this->execute($sqliteUpdata);
    }

    function allread()
    {
        $sqliteUpdata = "UPDATE PUSH SET READ = 1 WHERE IS_DELETE = 0 AND READ = 0;";
        return $this->execute($sqliteUpdata);
    }

    function unreadnum()
    {
        $stmt = $this->sqliteResult->prepare("SELECT count(ID) AS NUM FROM PUSH WHERE IS_DELETE = 0 AND READ = 0;");
        return $this->fetchArray($stmt->execute());
    }

    function get($id)
    {
        $stmt = $this->sqliteResult->prepare("SELECT * FROM PUSH WHERE IS_DELETE = 0 AND ID = :id;");
        $stmt->bindValue(':id', $id, SQLITE3_TEXT);
        return $this->fetchArray($stmt->execute());
    }

    function getlist($size = 10,$page = 0)
    {
        $stmt = $this->sqliteResult->prepare("SELECT * FROM PUSH ORDER BY READ ASC,TIMESTAMP DESC LIMIT :size OFFSET :page;");
        $stmt->bindValue(':size', $size, SQLITE3_INTEGER);
        $stmt->bindValue(':page', $page, SQLITE3_INTEGER);
        return $this->fetchArray($stmt->execute());
    }

    function getAll()
    {
        $sqliteSelect = "SELECT * FROM PUSH;";
        return $this->queryDB($sqliteSelect);
    }

    //此方法用于“增、删、改”
    function execute($sql)
    {
        return $this->error = $this->sqliteResult->exec($sql);
    }

    //此方法用于“查”
    function queryDB($sql)
    {
        $result = $this->sqliteResult->query($sql);
        return $this->fetchArray($result);
    }

    function fetchArray($result)
    {
        $i = 0;
        $arr = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $arr[$i] = $row;
            $i += 1;
        }
        return $arr;
    }

    function __destruct()
    {
        if ($this->error) {
            $errormsg = $this->sqliteResult->lastErrorMsg();
            if ($errormsg != 'not an error') {
                die("Database error：" . $errormsg);
            }
        }
        $this->sqliteResult->close();
    }
}