/* eslint-disable no-nested-ternary */
import Loading from '@/components/loading';
import useStyles from '@/components/transactions_list_bridge/components/mobile/styles';
import type { TransactionsListBridgeState } from '@/components/transactions_list_bridge/types';
import { useList, useListRow } from '@/hooks/use_react_window';
import { mergeRefs } from '@/utils/merge_refs';
import Divider from '@mui/material/Divider';
import { FC, useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import ExtendedTimestamp from '@/components/ExtendedTimestamp';
import SingleBridgeTransactionMobile from '@/components/single_bridge_transaction_mobile';
import { ACCOUNT_DETAILS, formatToken, getMiddleEllipsis, TRANSACTION_DETAILS } from '@/utils';
import { Tooltip, Typography, Zoom } from '@mui/material';
import Link from 'next/link';
import { formatNumberWithThousandsSeparator } from '@/screens/account_details/components/other_tokens/components/desktop';
import { Asset, convertHexToString } from '@/screens/assets/hooks';
import Big from 'big.js';
import Lottie from 'lottie-react';
import arrows from '@/assets/arrows.json';
import { XRPL_ACCOUNT_DETAILS, XRPL_TRANSACTION_DETAILS } from '@/utils/go_to_page';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  isItemLoaded: ((index: number) => boolean) | undefined;
  transaction: TransactionsListBridgeState['transactions'][number];
  isLast: boolean;
  assets: Asset[];
  metadatas: any[];
};

const ListItem: FC<ListItemProps> = ({
  index,
  style,
  setRowHeight,
  isItemLoaded,
  transaction,
  isLast,
  assets,
  metadatas,
}) => {
  const { classes } = useStyles();
  // const { t } = useTranslation('transactions');
  const { rowRef } = useListRow(index, setRowHeight);

  const renderSource = useCallback((source: string) => {
    if (source === 'coreum') {
      return (
        <div className={classes.route}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_12890_40417)">
              <rect x="0.00390625" y="0.5" width="20" height="20" rx="10" fill="#25D695" />
              <path
                d="M10.0043 8.90015C9.68785 8.90015 9.3785 8.99398 9.11539 9.1698C8.85227 9.34561 8.64719 9.59549 8.52609 9.88785C8.40499 10.1802 8.3733 10.5019 8.43504 10.8123C8.49678 11.1227 8.64916 11.4078 8.87293 11.6315C9.09669 11.8553 9.38178 12.0077 9.69215 12.0694C10.0025 12.1311 10.3242 12.0995 10.6166 11.9784C10.909 11.8573 11.1588 11.6522 11.3347 11.3891C11.5105 11.1259 11.6043 10.8166 11.6043 10.5001C11.6043 10.0758 11.4357 9.66883 11.1357 9.36878C10.8356 9.06872 10.4286 8.90015 10.0043 8.90015Z"
                fill="white"
              />
              <path
                d="M10.0041 4.1001C9.1635 4.09907 8.33096 4.26412 7.55431 4.58579C6.77767 4.90746 6.07223 5.3794 5.47852 5.9745L7.74252 8.2385C8.18992 7.79065 8.7601 7.48556 9.38093 7.36183C10.0018 7.23809 10.6453 7.30127 11.2302 7.54338C11.8152 7.78549 12.3151 8.19564 12.6669 8.72194C13.0186 9.24825 13.2064 9.86707 13.2064 10.5001C13.2064 11.1331 13.0186 11.752 12.6669 12.2783C12.3151 12.8046 11.8152 13.2147 11.2302 13.4568C10.6453 13.6989 10.0018 13.7621 9.38093 13.6384C8.7601 13.5146 8.18992 13.2096 7.74252 12.7617L5.47852 15.0257C6.22274 15.7699 7.13902 16.3191 8.14617 16.6246C9.15333 16.9301 10.2203 16.9825 11.2525 16.7771C12.2848 16.5718 13.2505 16.115 14.064 15.4474C14.8776 14.7797 15.5139 13.9217 15.9167 12.9493C16.3195 11.977 16.4762 10.9203 16.3731 9.87288C16.2699 8.82547 15.9101 7.81967 15.3254 6.94456C14.7407 6.06946 13.9492 5.35205 13.021 4.85589C12.0928 4.35974 11.0566 4.10014 10.0041 4.1001Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_12890_40417">
                <rect x="0.00390625" y="0.5" width="20" height="20" rx="10" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className={classes.arrows}>
            <Lottie
              animationData={arrows}
              style={{
                width: 20,
                height: 30,
              }}
            />
          </div>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="20" height="20" rx="10" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.06579 5.3472H5.78151C5.36742 5.34907 4.97083 5.51439 4.67802 5.8072C4.38521 6.10001 4.21988 6.4966 4.21802 6.91069V8.57572C4.21718 8.91989 4.13265 9.2587 3.97169 9.56292C3.81075 9.86715 3.5782 10.1276 3.29413 10.322C3.57901 10.5155 3.81218 10.7758 3.97323 11.0802C4.13428 11.3846 4.21832 11.7238 4.21802 12.0682V13.9972C4.21828 14.4387 4.3938 14.8621 4.70599 15.1743C5.01818 15.4865 5.44153 15.6619 5.88304 15.6622V16.3932C5.24631 16.3916 4.63628 16.1373 4.187 15.6861C3.73772 15.2349 3.48595 14.6238 3.48703 13.987V12.0682C3.48764 11.7157 3.35337 11.3762 3.11174 11.1195C2.87012 10.8628 2.53944 10.7082 2.1875 10.6875L2.20781 10.322L2.1875 9.95647C2.53944 9.93573 2.87012 9.78115 3.11174 9.52443C3.35337 9.2677 3.48764 8.92827 3.48703 8.57572V6.91069C3.48677 6.60931 3.54593 6.31082 3.66115 6.03232C3.77636 5.75382 3.94536 5.50077 4.15847 5.28766C4.37158 5.07454 4.62464 4.90554 4.90313 4.79032C5.18164 4.67511 5.48012 4.61594 5.78151 4.61621H6.06579V5.3472ZM13.9444 5.3472H14.2287C14.4334 5.34746 14.6361 5.38816 14.8251 5.46695C15.0142 5.54574 15.1858 5.66107 15.33 5.80635C15.4744 5.95161 15.5886 6.12394 15.6662 6.31345C15.7437 6.50297 15.7831 6.70593 15.782 6.91069V8.57572C15.7828 8.91989 15.8674 9.2587 16.0283 9.56292C16.1892 9.86714 16.4218 10.1276 16.7059 10.322C16.421 10.5155 16.1878 10.7758 16.0268 11.0802C15.8658 11.3846 15.7817 11.7238 15.782 12.0682V13.9972C15.7817 14.4387 15.6063 14.8621 15.2941 15.1743C14.9819 15.4865 14.5585 15.6619 14.117 15.6622V16.3932C14.7538 16.3916 15.3637 16.1373 15.8131 15.6861C16.2623 15.2349 16.5141 14.6238 16.513 13.987V12.0682C16.5124 11.7157 16.6466 11.3762 16.8882 11.1195C17.1299 10.8628 17.4605 10.7082 17.8125 10.6875L17.7922 10.322L17.8125 9.95647C17.4605 9.93573 17.1299 9.78115 16.8882 9.52443C16.6466 9.2677 16.5124 8.92827 16.513 8.57572V6.91069C16.5141 6.30359 16.2741 5.72089 15.8458 5.29065C15.4174 4.86041 14.8358 4.61782 14.2287 4.61621H13.9444V5.3472ZM12.6648 7.56116H13.7512L11.4871 9.68305C11.0809 10.0506 10.5527 10.2541 10.0048 10.2541C9.45703 10.2541 8.92877 10.0506 8.52257 9.68305L6.25854 7.56116H7.34487L9.06066 9.16527C9.31688 9.40042 9.65199 9.53089 9.99977 9.53089C10.3475 9.53089 10.6827 9.40042 10.9389 9.16527L12.6648 7.56116ZM6.24939 13.4487H7.33572L9.07181 11.8243C9.32803 11.5891 9.66314 11.4587 10.0109 11.4587C10.3587 11.4587 10.6938 11.5891 10.95 11.8243L12.676 13.4487H13.7623L11.4881 11.3167C11.0842 10.9446 10.555 10.738 10.0058 10.738C9.45664 10.738 8.92752 10.9446 8.52357 11.3167L6.24939 13.4487Z"
              fill="#23292F"
            />
          </svg>
        </div>
      );
    }

    return (
      <div className={classes.route}>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.5" width="20" height="20" rx="10" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.06579 5.3472H5.78151C5.36742 5.34907 4.97083 5.51439 4.67802 5.8072C4.38521 6.10001 4.21988 6.4966 4.21802 6.91069V8.57572C4.21718 8.91989 4.13265 9.2587 3.97169 9.56292C3.81075 9.86715 3.5782 10.1276 3.29413 10.322C3.57901 10.5155 3.81218 10.7758 3.97323 11.0802C4.13428 11.3846 4.21832 11.7238 4.21802 12.0682V13.9972C4.21828 14.4387 4.3938 14.8621 4.70599 15.1743C5.01818 15.4865 5.44153 15.6619 5.88304 15.6622V16.3932C5.24631 16.3916 4.63628 16.1373 4.187 15.6861C3.73772 15.2349 3.48595 14.6238 3.48703 13.987V12.0682C3.48764 11.7157 3.35337 11.3762 3.11174 11.1195C2.87012 10.8628 2.53944 10.7082 2.1875 10.6875L2.20781 10.322L2.1875 9.95647C2.53944 9.93573 2.87012 9.78115 3.11174 9.52443C3.35337 9.2677 3.48764 8.92827 3.48703 8.57572V6.91069C3.48677 6.60931 3.54593 6.31082 3.66115 6.03232C3.77636 5.75382 3.94536 5.50077 4.15847 5.28766C4.37158 5.07454 4.62464 4.90554 4.90313 4.79032C5.18164 4.67511 5.48012 4.61594 5.78151 4.61621H6.06579V5.3472ZM13.9444 5.3472H14.2287C14.4334 5.34746 14.6361 5.38816 14.8251 5.46695C15.0142 5.54574 15.1858 5.66107 15.33 5.80635C15.4744 5.95161 15.5886 6.12394 15.6662 6.31345C15.7437 6.50297 15.7831 6.70593 15.782 6.91069V8.57572C15.7828 8.91989 15.8674 9.2587 16.0283 9.56292C16.1892 9.86714 16.4218 10.1276 16.7059 10.322C16.421 10.5155 16.1878 10.7758 16.0268 11.0802C15.8658 11.3846 15.7817 11.7238 15.782 12.0682V13.9972C15.7817 14.4387 15.6063 14.8621 15.2941 15.1743C14.9819 15.4865 14.5585 15.6619 14.117 15.6622V16.3932C14.7538 16.3916 15.3637 16.1373 15.8131 15.6861C16.2623 15.2349 16.5141 14.6238 16.513 13.987V12.0682C16.5124 11.7157 16.6466 11.3762 16.8882 11.1195C17.1299 10.8628 17.4605 10.7082 17.8125 10.6875L17.7922 10.322L17.8125 9.95647C17.4605 9.93573 17.1299 9.78115 16.8882 9.52443C16.6466 9.2677 16.5124 8.92827 16.513 8.57572V6.91069C16.5141 6.30359 16.2741 5.72089 15.8458 5.29065C15.4174 4.86041 14.8358 4.61782 14.2287 4.61621H13.9444V5.3472ZM12.6648 7.56116H13.7512L11.4871 9.68305C11.0809 10.0506 10.5527 10.2541 10.0048 10.2541C9.45703 10.2541 8.92877 10.0506 8.52257 9.68305L6.25854 7.56116H7.34487L9.06066 9.16527C9.31688 9.40042 9.65199 9.53089 9.99977 9.53089C10.3475 9.53089 10.6827 9.40042 10.9389 9.16527L12.6648 7.56116ZM6.24939 13.4487H7.33572L9.07181 11.8243C9.32803 11.5891 9.66314 11.4587 10.0109 11.4587C10.3587 11.4587 10.6938 11.5891 10.95 11.8243L12.676 13.4487H13.7623L11.4881 11.3167C11.0842 10.9446 10.555 10.738 10.0058 10.738C9.45664 10.738 8.92752 10.9446 8.52357 11.3167L6.24939 13.4487Z"
            fill="#23292F"
          />
        </svg>
        <div className={classes.arrows}>
          <Lottie
            animationData={arrows}
            style={{
              width: 20,
              height: 30,
            }}
          />
        </div>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_12890_40417)">
            <rect x="0.00390625" y="0.5" width="20" height="20" rx="10" fill="#25D695" />
            <path
              d="M10.0043 8.90015C9.68785 8.90015 9.3785 8.99398 9.11539 9.1698C8.85227 9.34561 8.64719 9.59549 8.52609 9.88785C8.40499 10.1802 8.3733 10.5019 8.43504 10.8123C8.49678 11.1227 8.64916 11.4078 8.87293 11.6315C9.09669 11.8553 9.38178 12.0077 9.69215 12.0694C10.0025 12.1311 10.3242 12.0995 10.6166 11.9784C10.909 11.8573 11.1588 11.6522 11.3347 11.3891C11.5105 11.1259 11.6043 10.8166 11.6043 10.5001C11.6043 10.0758 11.4357 9.66883 11.1357 9.36878C10.8356 9.06872 10.4286 8.90015 10.0043 8.90015Z"
              fill="white"
            />
            <path
              d="M10.0041 4.1001C9.1635 4.09907 8.33096 4.26412 7.55431 4.58579C6.77767 4.90746 6.07223 5.3794 5.47852 5.9745L7.74252 8.2385C8.18992 7.79065 8.7601 7.48556 9.38093 7.36183C10.0018 7.23809 10.6453 7.30127 11.2302 7.54338C11.8152 7.78549 12.3151 8.19564 12.6669 8.72194C13.0186 9.24825 13.2064 9.86707 13.2064 10.5001C13.2064 11.1331 13.0186 11.752 12.6669 12.2783C12.3151 12.8046 11.8152 13.2147 11.2302 13.4568C10.6453 13.6989 10.0018 13.7621 9.38093 13.6384C8.7601 13.5146 8.18992 13.2096 7.74252 12.7617L5.47852 15.0257C6.22274 15.7699 7.13902 16.3191 8.14617 16.6246C9.15333 16.9301 10.2203 16.9825 11.2525 16.7771C12.2848 16.5718 13.2505 16.115 14.064 15.4474C14.8776 14.7797 15.5139 13.9217 15.9167 12.9493C16.3195 11.977 16.4762 10.9203 16.3731 9.87288C16.2699 8.82547 15.9101 7.81967 15.3254 6.94456C14.7407 6.06946 13.9492 5.35205 13.021 4.85589C12.0928 4.35974 11.0566 4.10014 10.0041 4.1001Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_12890_40417">
              <rect x="0.00390625" y="0.5" width="20" height="20" rx="10" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }, []);

  if (!isItemLoaded?.(index)) {
    return (
      <div style={style}>
        <div ref={rowRef}>
          <Loading />
        </div>
      </div>
    );
  }

  let { denom } = transaction.coin;

  if (transaction.source === 'xrpl') {
    const assetInRegisteredAssets = assets.find(
      (asset: Asset) =>
        asset.extra.xrpl_info?.currency.toLowerCase() === transaction.coin.denom.toLowerCase()
    );

    if (assetInRegisteredAssets) {
      denom = assetInRegisteredAssets.denom;
    }
  }

  const asset = metadatas.find((item: any) => item.base.toLowerCase() === denom.toLowerCase());

  let amount = formatToken(transaction.coin.amount, denom).value;

  if (asset?.denom_units[1].exponent) {
    const availableValue = new Big(+transaction.coin.amount)
      .div(Big(10).pow(asset?.denom_units[1].exponent))
      .toFixed(asset?.denom_units[1].exponent);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  const tokenInAssets = assets.find(
    (assetItem: any) => denom.toLowerCase() === assetItem.denom.toLowerCase()
  );

  if (transaction.source === 'xrpl' && tokenInAssets?.extra.xrpl_info?.precision) {
    const availableValue = new Big(+transaction.coin.amount)
      .div(Big(10).pow(tokenInAssets?.extra.xrpl_info?.precision))
      .toFixed(tokenInAssets?.extra.xrpl_info?.precision);

    amount = formatNumberWithThousandsSeparator(availableValue);
  }

  let displayDenom = asset?.display.toUpperCase() || denom.toUpperCase();
  if (
    tokenInAssets &&
    tokenInAssets?.extra.xrpl_info &&
    tokenInAssets?.extra.xrpl_info.source_chain.toLowerCase() === 'xrpl'
  ) {
    displayDenom =
      tokenInAssets?.extra.xrpl_info.currency.length === 40
        ? convertHexToString(tokenInAssets?.extra.xrpl_info.currency)
        : tokenInAssets?.extra.xrpl_info.currency;
  }

  if (tokenInAssets) {
    if (denom.includes('ibc')) {
      const tokenDenom = tokenInAssets.extra.ibc_info!.display_name;
      const availableValue = new Big(+transaction.coin.amount)
        .div(Big(10).pow(tokenInAssets.extra.ibc_info!.precision))
        .toFixed(tokenInAssets.extra.ibc_info!.precision);

      amount = formatNumberWithThousandsSeparator(availableValue);
      displayDenom = tokenDenom;
    }
  }

  const item = {
    route: renderSource(transaction.source),
    amount: (
      <Typography variant="body1" className={classes.amount}>
        {amount.split('.')[0]}
        {amount.split('.')[1] && <span className={classes.decimal}>.{amount.split('.')[1]}</span>}
        <span className={classes.denom}>{displayDenom}</span>
      </Typography>
    ),
    sender: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.sender}</pre>}
        placement="bottom"
        arrow
      >
        <Link
          shallow
          prefetch={false}
          target="_blank"
          href={
            transaction.source === 'coreum'
              ? ACCOUNT_DETAILS(transaction.sender)
              : XRPL_ACCOUNT_DETAILS(transaction.sender)
          }
        >
          {getMiddleEllipsis(transaction?.sender || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    destination: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.destination}</pre>}
        placement="bottom"
        arrow
      >
        <Link
          shallow
          prefetch={false}
          target="_blank"
          href={
            transaction.source === 'xrpl'
              ? ACCOUNT_DETAILS(transaction.destination)
              : XRPL_ACCOUNT_DETAILS(transaction.destination)
          }
        >
          {getMiddleEllipsis(transaction?.destination || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    txHash_1: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.txHash_1}</pre>}
        placement="bottom"
        arrow
      >
        <Link
          shallow
          prefetch={false}
          target="_blank"
          href={
            transaction.source === 'coreum'
              ? TRANSACTION_DETAILS(transaction.txHash_1)
              : XRPL_TRANSACTION_DETAILS(transaction.txHash_1)
          }
        >
          {getMiddleEllipsis(transaction?.txHash_1 || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    txHash_2: (
      <Tooltip
        TransitionComponent={Zoom}
        title={<pre>{transaction.txHash_2}</pre>}
        placement="bottom"
        arrow
      >
        <Link
          shallow
          prefetch={false}
          target="_blank"
          href={
            transaction.source === 'xrpl'
              ? TRANSACTION_DETAILS(transaction.txHash_2)
              : XRPL_TRANSACTION_DETAILS(transaction.txHash_2)
          }
        >
          {getMiddleEllipsis(transaction?.txHash_2 || '', {
            beginning: 7,
            ending: 4,
          })}
        </Link>
      </Tooltip>
    ),
    time: <ExtendedTimestamp timestamp={transaction.timestamp} flexEnd={false} />,
  };

  return (
    <div style={style}>
      <div ref={rowRef}>
        <SingleBridgeTransactionMobile {...item} />
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

const Mobile: FC<TransactionsListBridgeState> = ({
  className,
  itemCount,
  loadMoreItems,
  isItemLoaded,
  transactions,
  assets,
  metadatas,
}) => {
  const { classes, cx } = useStyles();
  const { listRef, getRowHeight, setRowHeight } = useList();

  return (
    <div className={cx(classes.root, className)}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded ?? (() => true)}
            itemCount={itemCount}
            loadMoreItems={
              loadMoreItems ??
              (() => {
                // do nothing
              })
            }
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                itemCount={itemCount}
                itemSize={getRowHeight}
                onItemsRendered={onItemsRendered}
                ref={mergeRefs(listRef, ref)}
                width={width}
              >
                {({ index, style }) => (
                  <ListItem
                    key={index}
                    index={index}
                    style={style}
                    setRowHeight={setRowHeight}
                    isItemLoaded={isItemLoaded}
                    transaction={transactions[index]}
                    isLast={index === itemCount - 1}
                    assets={assets}
                    metadatas={metadatas}
                  />
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default Mobile;
