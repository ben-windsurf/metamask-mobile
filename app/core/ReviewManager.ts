import React from 'react';
import { Platform, Linking } from 'react-native';
/* eslint-disable-next-line */
import { NavigationContainerRef } from '@react-navigation/core';
import InAppReview from 'react-native-in-app-review';
import StorageWrapper from '../store/storage-wrapper';
import { REVIEW_EVENT_COUNT, REVIEW_SHOWN_TIME } from '../constants/storage';
import Logger from '../util/Logger';
import { MM_APP_STORE_LINK, MM_PLAY_STORE_LINK } from '../constants/urls';

/** Minimum number of events required before showing review prompt */
const EVENT_THRESHOLD = 6;
/** Time threshold in milliseconds (4 months) before showing review prompt again */
const TIME_THRESHOLD = 10519200000; // 4 months in milliseconds
/** Deep link URL for MetaMask App Store review page */
const MM_APP_STORE_DEEPLINK = `${MM_APP_STORE_LINK}?action=write-review`;

/**
 * Manages in-app review prompts and fallback review flows for MetaMask Mobile.
 * Tracks user events and time-based criteria to determine when to show review prompts.
 * Handles both native in-app reviews and fallback to store review pages.
 */
class ReviewManager {
  /** Navigation reference for opening review modal as fallback */
  navigationRef?: React.MutableRefObject<NavigationContainerRef>;

  /**
   * Increments the stored event count for review prompt criteria.
   * Used to track user engagement before showing review prompts.
   */
  private addEventCount = async () => {
    try {
      const previousCount =
        (await StorageWrapper.getItem(REVIEW_EVENT_COUNT)) || '0';
      const newCount = parseInt(previousCount) + 1;
      await StorageWrapper.setItem(REVIEW_EVENT_COUNT, `${newCount}`);
    } catch (error) {
      // Failed to add event count
    }
  };

  /**
   * Checks if the criteria for showing a review prompt are met.
   * Verifies both event count threshold and time threshold since last review.
   *
   * @returns Promise that resolves to true if review should be shown, false otherwise
   */
  private checkReviewCriteria = async () => {
    const isReviewAvailable = InAppReview.isAvailable();
    if (!isReviewAvailable) {
      return false;
    }

    try {
      const eventCount = await StorageWrapper.getItem(REVIEW_EVENT_COUNT);
      const lastShownTime =
        (await StorageWrapper.getItem(REVIEW_SHOWN_TIME)) || '0';
      const satisfiedEventCount =
        parseInt(eventCount || '0') >= EVENT_THRESHOLD;
      const satisfiedTime =
        Date.now() - parseInt(lastShownTime) > TIME_THRESHOLD;
      return satisfiedEventCount && satisfiedTime;
    } catch (error) {
      return false;
    }
  };

  /**
   * Resets the review criteria by clearing event count and updating last shown time.
   * Called after a review prompt has been shown to prevent immediate re-prompting.
   */
  private resetReviewCriteria = async () => {
    try {
      const currentUnixTime = Date.now();
      await StorageWrapper.setItem(REVIEW_EVENT_COUNT, '0');
      await StorageWrapper.setItem(REVIEW_SHOWN_TIME, `${currentUnixTime}`);
    } catch (error) {
      // Failed to reset criteria
    }
  };

  /**
   * Handles the actual review prompt display.
   * Attempts native in-app review first, falls back to MetaMask review modal on failure.
   * Always resets review criteria after attempting to show prompt.
   */
  private handlePrompt = async () => {
    try {
      await InAppReview.RequestInAppReview();
    } catch (error) {
      // Failed to prompt review
      this.openMetaMaskReview();
      Logger.log('Falling back to MM review prompt', error);
    } finally {
      // Reset criteria
      this.resetReviewCriteria();
    }
  };

  /**
   * Opens the MetaMask review modal as a fallback when native review fails.
   * Navigates to the ReviewModal screen using the navigation reference.
   */
  private openMetaMaskReview = () => {
    this.navigationRef?.current?.navigate('ReviewModal');
  };

  /**
   * Main method to prompt for app review.
   * Increments event count, checks criteria, and shows review prompt if conditions are met.
   * This should be called when user completes significant actions in the app.
   */
  promptReview = async () => {
    // 1. Add event count
    await this.addEventCount();

    // 2. Check criteria
    const shouldShowReview = await this.checkReviewCriteria();
    if (!shouldShowReview) {
      return;
    }

    // 3. Handle prompt
    this.handlePrompt();
  };

  openFallbackStoreReview = async () => {
    const storeDeepLink =
      Platform.select({
        ios: MM_APP_STORE_DEEPLINK,
        android: MM_PLAY_STORE_LINK,
      }) || '';
    try {
      await Linking.openURL(storeDeepLink);
    } catch (error) {
      // Failed to open store review
    }
  };
}

export default new ReviewManager();
