import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/pages/forms/Input';
import Textarea from 'components/pages/forms/Textarea';
import Select from 'components/pages/forms/Select';
import Checkbox from 'components/pages/forms/Checkbox';
import Date from 'components/pages/forms/Date';


function FormControl({control, ...rest}) {
	switch(control) {
		case 'input': return <Input {...rest} />
		case 'textarea': return <Textarea {...rest} />
		case 'select': return <Select {...rest} />
		case 'checkbox': return <Checkbox {...rest} />
		case 'date': return <Date {...rest} />
		default: return null
	}
}

FormControl.propTypes = {
	control: PropTypes.string.isRequired,
};

export default FormControl;