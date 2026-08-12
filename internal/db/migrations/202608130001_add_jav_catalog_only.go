package migrations

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddNamedMigrationContext(
		"202608130001_add_jav_catalog_only.go",
		addJavCatalogOnly,
		irreversibleMigration,
	)
}

func addJavCatalogOnly(ctx context.Context, tx *sql.Tx) error {
	if err := addColumnIfMissing(ctx, tx, "jav", "is_catalog_only", "numeric NOT NULL DEFAULT 0"); err != nil {
		return err
	}
	return execDB(ctx, tx, `CREATE INDEX IF NOT EXISTS "idx_jav_is_catalog_only" ON "jav" ("is_catalog_only")`)
}
