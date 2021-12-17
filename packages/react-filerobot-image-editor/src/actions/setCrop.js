import toPrecisedFloat from 'utils/toPrecisedFloat';

export const SET_CROP = 'SET_CROP';

const setCrop = (state, payload) => {
  const oldCrop = state.adjustments.crop ?? {};
  const newCrop = {
    x: toPrecisedFloat(payload.x) ?? oldCrop.x,
    y: toPrecisedFloat(payload.y) ?? oldCrop.y,
    ratio:
      typeof payload.ratio === 'string'
        ? payload.ratio
        : toPrecisedFloat(payload.ratio) ?? oldCrop.ratio,
    width: toPrecisedFloat(payload.width) ?? oldCrop.width,
    height: toPrecisedFloat(payload.height) ?? oldCrop.height,
  };

  if (
    oldCrop.x === newCrop.x &&
    oldCrop.y === newCrop.y &&
    (oldCrop.width === newCrop.width ||
      newCrop.width === toPrecisedFloat(state.shownImageDimensions.width)) &&
    (oldCrop.height === newCrop.height ||
      newCrop.height === toPrecisedFloat(state.shownImageDimensions.height)) &&
    oldCrop.ratio === newCrop.ratio
  ) {
    return state;
  }

  return {
    ...state,
    isDesignState: !payload.dismissHistory,
    adjustments: {
      ...state.adjustments,
      crop: {
        ...oldCrop,
        ...newCrop,
      },
    },
  };
};

export default setCrop;
