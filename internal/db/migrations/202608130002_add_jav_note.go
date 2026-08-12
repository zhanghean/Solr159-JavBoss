package migrations

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddNamedMigrationContext("202608130002_add_jav_note.go", addJavNote, irreversibleMigration)
}

func addJavNote(ctx context.Context, tx *sql.Tx) error {
	return addColumnIfMissing(ctx, tx, "jav", "note", `text NOT NULL DEFAULT ""`)
}
