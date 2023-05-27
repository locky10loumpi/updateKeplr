package foo_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "updateKeplr/testutil/keeper"
	"updateKeplr/testutil/nullify"
	"updateKeplr/x/foo"
	"updateKeplr/x/foo/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.FooKeeper(t)
	foo.InitGenesis(ctx, *k, genesisState)
	got := foo.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
