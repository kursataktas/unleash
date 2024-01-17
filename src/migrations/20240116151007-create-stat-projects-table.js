exports.up = function(db, cb) {
    db.runSql(`
        CREATE TABLE stat_projects(
                created_at TIMESTAMP NOT NULL,
                project VARCHAR(255) NOT NULL,
                flags_active_total INT,
                flags_stale INT,
                flags_archived INT,
                PRIMARY KEY (created_at, project)
                FOREIGN KEY (project) references projects(id) ON DELETE NO ACTION,
        );
    `, cb);
};

exports.down = function(db, cb) {
    db.runSql(`
        DROP TABLE IF EXISTS stat_projects;
    `, cb);
};
