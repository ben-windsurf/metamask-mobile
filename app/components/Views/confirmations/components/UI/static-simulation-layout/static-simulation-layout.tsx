import React from 'react';

import { strings } from '../../../../../../../locales/i18n';
import AnimatedSpinner, {
  SpinnerSize,
} from '../../../../../UI/AnimatedSpinner';
import InfoSection from '../info-row/info-section';
import InfoRow from '../info-row/info-row';

/**
 * StaticSimulationLayout component provides a standardized layout for displaying transaction simulation results
 * Shows a simulation section with loading state support and renders child content when not loading
 * Used in confirmation flows to display security analysis and transaction preview information
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when not in loading state
 * @param {boolean} [props.isLoading=false] - Whether to show loading spinner instead of children
 * @param {string} [props.testID] - Test identifier for the component
 * @returns {JSX.Element} The rendered static simulation layout component
 */
export const StaticSimulationLayout = ({
  children,
  isLoading = false,
  testID,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  testID?: string;
}) => (
  <InfoSection testID={testID}>
    <InfoRow
      label={strings('confirm.simulation.title')}
      tooltip={strings('confirm.simulation.tooltip')}
    >
      {isLoading && (
        <AnimatedSpinner
          testID="simulation-details-spinner"
          size={SpinnerSize.SM}
        />
      )}
    </InfoRow>
    {!isLoading && children}
  </InfoSection>
);
