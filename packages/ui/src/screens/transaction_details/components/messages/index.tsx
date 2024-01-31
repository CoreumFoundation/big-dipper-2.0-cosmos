import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import useStyles from '@/screens/transaction_details/components/messages/styles';
import { useList, useListRow } from '@/hooks/use_react_window';
import { getMessageByType } from '@/components/msg/utils';
import Box from '@/components/box';
import { Asset } from '@/screens/assets/hooks';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  message: unknown;
  classes: ReturnType<typeof useStyles>['classes'];
  isLast: boolean;
  viewRaw: boolean;
  assets: Asset[];
  metadatas: any[];
};

const ListItem: FC<ListItemProps> = ({
  index,
  style,
  setRowHeight,
  message,
  classes,
  isLast,
  viewRaw,
  assets,
  metadatas,
}) => {
  const { t } = useTranslation('transactions');
  const { rowRef } = useListRow(index, setRowHeight);

  const formattedItem = getMessageByType(message, viewRaw, t, assets, metadatas);

  return (
    <div style={style}>
      <div ref={rowRef}>
        <div className={classes.item}>
          {!viewRaw ? <div className={classes.tags}>{formattedItem.type}</div> : ''}
          <span className="msg">{formattedItem.message}</span>
        </div>
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

type MessagesProps = {
  className?: string;
  messages: unknown[];
  viewRaw: boolean;
  toggleMessageDisplay: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onMessageFilterCallback: (value: string) => void;
  assets: Asset[];
  metadatas: any[];
};

const Messages: FC<MessagesProps> = ({ className, ...props }) => {
  const { t } = useTranslation('transactions');
  const { classes, cx } = useStyles();
  const { listRef, getRowHeight, setRowHeight } = useList();

  return (
    <Box className={cx(classes.root, className)}>
      <div className={classes.header}>
        <div className={classes.mobileOptions}>
          <Typography variant="h2">{t('messages')}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={props.viewRaw}
                onChange={props.toggleMessageDisplay}
                color="primary"
              />
            }
            label={t('raw')}
          />
        </div>
        <div className={classes.desktopOptions}>
          <FormControlLabel
            control={
              <Switch
                checked={props.viewRaw}
                onChange={props.toggleMessageDisplay}
                color="primary"
              />
            }
            label={t('raw')}
          />
        </div>
      </div>
      <Divider />
      <div className={classes.list}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={props.messages.length}
              itemSize={getRowHeight}
              ref={listRef as LegacyRef<List>}
              width={width}
            >
              {({ index, style }) => (
                <ListItem
                  key={index}
                  index={index}
                  style={style}
                  setRowHeight={setRowHeight}
                  message={props.messages[index]}
                  classes={classes}
                  isLast={index === props.messages.length}
                  viewRaw={props.viewRaw}
                  assets={props.assets}
                  metadatas={props.metadatas}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </Box>
  );
};

export default Messages;
