package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"updateKeplr/x/foo/types"
)

func (k msgServer) FooMessage(goCtx context.Context, msg *types.MsgFooMessage) (*types.MsgFooMessageResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}

	amt, err := sdk.ParseCoinsNormalized(msg.Coins)
	if err != nil {
		return nil, err
	}
	err = k.bankKeeper.MintCoins(ctx, types.ModuleName, amt)
	if err != nil {
		return nil, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, creator, amt)
	if err != nil {
		return nil, err
	}

	return &types.MsgFooMessageResponse{}, nil
}
