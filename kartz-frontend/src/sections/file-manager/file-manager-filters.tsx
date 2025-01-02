import type { UseSetStateReturn } from 'src/hooks/use-set-state';
import type { IDatePickerControl } from 'src/types/common';
import type { IFileFilters } from 'src/types/file';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { CustomDateRangePicker } from 'src/components/custom-date-range-picker';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { getExtensionFromMimeType } from 'src/utils/convert-mime';

// ----------------------------------------------------------------------

type Props = {
  dateError: boolean;
  openDateRange: boolean;
  onResetPage: () => void;
  onOpenDateRange: () => void;
  onCloseDateRange: () => void;
  filters: UseSetStateReturn<IFileFilters>;
  options: {
    types: string[];
  };
};

export function FileManagerFilters({
  filters,
  options,
  dateError,
  onResetPage,
  openDateRange,
  onOpenDateRange,
  onCloseDateRange,
}: Props) {
  const popover = usePopover();

  const renderLabel = filters.state.docType.length
    ? filters.state.docType.slice(0, 2).join(',')
    : 'All type';

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      filters.setState({ docName: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      filters.setState({ endDate: newValue });
    },
    [filters]
  );

  const handleFilterType = useCallback(
    (newValue: string) => {
      const checked = filters.state.docType.includes(newValue)
        ? filters.state.docType.filter((value) => value !== newValue)
        : [...filters.state.docType, newValue];

      filters.setState({ docType: checked });
    },
    [filters]
  );

  const handleResetType = useCallback(() => {
    popover.onClose();
    filters.setState({ docType: [] });
  }, [filters, popover]);

  const renderFilterName = (
    <TextField
      value={filters.state.docName}
      onChange={handleFilterName}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
      sx={{ width: { xs: 1, md: 260 } }}
    />
  );

  const renderFilterType = (
    <>
      <Button
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: -0.5 }}
          />
        }
      >
        {renderLabel}
        {filters.state.docType.length > 2 && (
          <Label color="info" sx={{ ml: 1 }}>
            +{filters.state.docType.length - 2}
          </Label>
        )}
      </Button>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ paper: { sx: { p: 2.5 } } }}
      >
        <Stack spacing={2.5}>
          <Box
            gap={1}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
          >
            {options.types.map((type) => {
              const selected = getExtensionFromMimeType(filters?.state?.docType[0]).includes(type);
              return (
                <CardActionArea
                  key={type}
                  onClick={() => handleFilterType(type)}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: (theme) =>
                      `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                    ...(selected && { bgcolor: 'action.selected' }),
                  }}
                >
                  <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    sx={{
                      typography: 'caption',
                      textTransform: 'capitalize',
                      ...(selected && { fontWeight: 'fontWeightSemiBold' }),
                    }}
                  >
                    <FileThumbnail file={type} sx={{ width: 24, height: 24 }} />
                    {type}
                  </Stack>
                </CardActionArea>
              );
            })}
          </Box>

          <Stack spacing={1.5} direction="row" alignItems="center" justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={handleResetType}>
              Clear
            </Button>

            <Button variant="contained" onClick={popover.onClose}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );

  const renderFilterDate = (
    <>
      <Button
        color="inherit"
        onClick={onOpenDateRange}
        endIcon={
          <Iconify
            icon={openDateRange ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: -0.5 }}
          />
        }
      >
        {!!filters.state.startDate && !!filters.state.endDate
          ? fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)
          : 'Select date'}
      </Button>

      <CustomDateRangePicker
        variant="calendar"
        startDate={filters.state.startDate}
        endDate={filters.state.endDate}
        onChangeStartDate={handleFilterStartDate}
        onChangeEndDate={handleFilterEndDate}
        open={openDateRange}
        onClose={onCloseDateRange}
        selected={!!filters.state.startDate && !!filters.state.endDate}
        error={dateError}
      />
    </>
  );

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      sx={{ width: 1 }}
    >
      {renderFilterName}

      <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end" flexGrow={1}>
        {renderFilterDate}

        {renderFilterType}
      </Stack>
    </Stack>
  );
}