import { merge } from 'lodash';
import Card from './Card';
import Lists from './Lists';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import IconButton from './IconButton';
import Autocomplete from './Autocomplete';
import Chip from './Chip';
import DataGrid from './DataGrid';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return merge(
        Card(theme),
        Lists(theme),
        Paper(theme),
        Input(theme),
        Button(theme),
        Tooltip(theme),
        Backdrop(theme),
        Typography(theme),
        IconButton(theme),
        Autocomplete(theme),
        DataGrid(theme),
        Chip(theme)
    );
}
