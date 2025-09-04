///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
import React, { Component } from 'react';
import { View, NativeSyntheticEvent } from 'react-native';
import { WebViewMessageEvent, WebView } from '@metamask/react-native-webview';
import { createStyles } from './styles';
import { WebViewInterface } from '@metamask/snaps-controllers/react-native';
import { WebViewError } from '@metamask/react-native-webview/src/WebViewTypes';
import { PostMessageEvent } from '@metamask/post-message-stream';
// @ts-expect-error Types are currently broken for this.
import WebViewHTML from '@metamask/snaps-execution-environments/dist/webpack/webview/index.html';
import { EmptyObject } from '@metamask/snaps-sdk';

/**
 * Styles for the SnapsExecutionWebView component
 */
const styles = createStyles();

// This is a hack to allow us to asynchronously await the creation of the WebView.
/**
 * Creates a new WebView for Snaps execution
 * @param jobId - Unique identifier for the WebView job
 * @returns Promise that resolves to a WebViewInterface
 */
// eslint-disable-next-line import/no-mutable-exports
export let createWebView: (jobId: string) => Promise<WebViewInterface>;

/**
 * Removes a WebView by job ID
 * @param jobId - Unique identifier for the WebView job to remove
 */
// eslint-disable-next-line import/no-mutable-exports
export let removeWebView: (jobId: string) => void;

/**
 * State interface for managing individual WebView instances
 * @interface WebViewState
 * @property ref - Reference to the WebView component
 * @property listener - Message event listener function
 * @property props - WebView component properties and event handlers
 */
interface WebViewState {
  /** Reference to the WebView component */
  ref?: WebView;
  /** Message event listener function */
  listener?: (event: PostMessageEvent) => void;
  /** WebView component properties and event handlers */
  props: {
    /** Handler for WebView message events */
    onWebViewMessage: (data: WebViewMessageEvent) => void;
    /** Handler for WebView load completion */
    onWebViewLoad: () => void;
    /** Handler for WebView error events */
    onWebViewError: (error: NativeSyntheticEvent<WebViewError>) => void;
    /** Callback to set WebView reference */
    ref: (ref: WebView) => void;
  };
}

/**
 * React component for managing WebView instances used in Snaps execution.
 * This is a class component because storing the references we need don't work in functional components.
 *
 * @example
 * ```tsx
 * <SnapsExecutionWebView />
 * ```
 */
export class SnapsExecutionWebView extends Component {
  webViews: Record<string, WebViewState> = {};

  constructor(props: EmptyObject) {
    super(props);

    createWebView = this.createWebView.bind(this);
    removeWebView = this.removeWebView.bind(this);
  }

  createWebView(jobId: string) {
    const promise = new Promise<WebViewInterface>((resolve, reject) => {
      const onWebViewLoad = () => {
        const api = {
          injectJavaScript: (js: string) => {
            this.webViews[jobId]?.ref?.injectJavaScript(js);
          },
          registerMessageListener: (
            listener: (event: PostMessageEvent) => void,
          ) => {
            if (this.webViews[jobId]) {
              this.webViews[jobId].listener = listener;
            }
          },
          unregisterMessageListener: (
            _listener: (event: PostMessageEvent) => void,
          ) => {
            if (this.webViews[jobId]) {
              this.webViews[jobId].listener = undefined;
            }
          },
        };
        resolve(api);
      };

      const onWebViewMessage = (data: WebViewMessageEvent) => {
        if (this.webViews[jobId]?.listener) {
          this.webViews[jobId].listener?.(
            data.nativeEvent as unknown as PostMessageEvent,
          );
        }
      };

      const onWebViewError = (error: NativeSyntheticEvent<WebViewError>) => {
        reject(error);
      };

      const setWebViewRef = (ref: WebView) => {
        if (this.webViews[jobId]) {
          this.webViews[jobId].ref = ref;
        }
      };

      this.webViews[jobId] = {
        props: {
          onWebViewLoad,
          onWebViewError,
          onWebViewMessage,
          ref: setWebViewRef,
        },
      };
    });

    // Force re-render.
    this.forceUpdate();

    return promise;
  }

  removeWebView(jobId: string) {
    delete this.webViews[jobId];

    // Force re-render.
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        {Object.entries(this.webViews).map(([key, { props }]) => (
          <WebView
            testID={key}
            key={key}
            ref={props.ref}
            source={{ html: WebViewHTML, baseUrl: 'https://localhost' }}
            onMessage={props.onWebViewMessage}
            onError={props.onWebViewError}
            onLoadEnd={props.onWebViewLoad}
            originWhitelist={['*']}
            javaScriptEnabled
          />
        ))}
      </View>
    );
  }
}
///: END:ONLY_INCLUDE_IF
