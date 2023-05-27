package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "updateKeplr/testutil/keeper"
	"updateKeplr/x/foo/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.FooKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
