import { Dispatch } from 'redux';

import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';
import { contentState, initialize } from '../reducers/contentReducer';
import { dispatcher } from '..';

export const setLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.isLoading = state;

    dispatcher(ActionTypes.CONTENT_LOADING, payload, dispatch);
}

export const setVideoLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.isVideoLoaded = state;

    dispatcher(ActionTypes.CONTENT_VIDEO_LOADING, payload, dispatch);
}

export const setFontLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.isFontLoaded = state;
    dispatcher(ActionTypes.CONTENT_FONT_LOADING, payload, dispatch);
}

export const setLoadingBar = (state: number) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.loadingBar = state;

    dispatcher(ActionTypes.CONTENT_LOADING_BAR, payload, dispatch);
}

export const setFingerprintInitStatus = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.isFingerPrintInited = state;

    dispatcher(ActionTypes.CONTENT_FINGERPRINT_INIT, payload, dispatch);
}

export const setVideoContent = (state: HTMLVideoElement) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.backgroundVideo = state;

    dispatcher(ActionTypes.CONTENT_SET_VIDEO, payload, dispatch);
}

export const setMusicLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.isMusicLoaded = state;

    dispatcher(ActionTypes.CONTENT_MUSIC_LOADING, payload, dispatch);
}

export const setMusicContent = (state: HTMLAudioElement) => (dispatch: Dispatch<Action>) => {
    const payload: contentState = initialize;
    payload.backgroundMusic = state;

    dispatcher(ActionTypes.CONTENT_SET_MUSIC, payload, dispatch);
}