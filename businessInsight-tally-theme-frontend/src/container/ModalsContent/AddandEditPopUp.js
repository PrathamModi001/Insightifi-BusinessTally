import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const AddandEditPopUp = ({
  formik,
  value,
  setValue,
  inputValue,
  setInputValue,
  handleSearchCompany,
  handlePopUpClose,
  companyList,
  popup,
  addPowerBiLoading,
  updatePowerBiLoading,
  btnText
}) => {
  return (
    <div>
      <form autoComplete='off' onSubmit={formik?.handleSubmit}>
        <Autocomplete
          name='companyId'
          onChange={(event, newValue) => {
            setValue(newValue)
            formik.setFieldValue('companyId', newValue === null ? '' : newValue.id)
          }}
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
            handleSearchCompany(newInputValue)
          }}
          id='controllable-states-demo'
          options={companyList ?? []}
          getOptionLabel={option => option?.name}
          sx={{ marginBottom: 4 }}
          filterOptions={options => options}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              type='text'
              name='companyId'
              value={value}
              error={formik.touched.companyId && Boolean(formik.errors.companyId)}
              helperText={formik.touched.companyId && formik.errors.companyId}
              label='Company Name'
            />
          )}
        />

        <TextField
          fullWidth
          sx={{ marginBottom: 4 }}
          type='text'
          label='Report Id'
          name='dashboardId'
          value={formik?.values?.dashboardId}
          onChange={formik?.handleChange}
          helperText={formik?.touched.dashboardId && formik?.errors.dashboardId}
          error={formik?.touched.dashboardId && Boolean(formik?.errors.dashboardId)}
        />
        <div style={{ display: 'flex', gap: 25, justifyContent: 'space-around', paddingTop: '20px' }}>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ marginBottom: 7 }}
            loading={popup === 'Add' ? addPowerBiLoading : updatePowerBiLoading}
          >
            {btnText}
          </LoadingButton>
          <LoadingButton fullWidth size='large' onClick={handlePopUpClose} variant='outlined' sx={{ marginBottom: 7 }}>
            Cancel
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default AddandEditPopUp
