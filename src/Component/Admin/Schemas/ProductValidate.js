import * as Yup from 'yup';

export const catgoryValidate  = Yup.object({
    Cname: Yup.string().required('Category Name is required'),
    Description: Yup.string().required('Description is required')
  });

  export const SubcatgoryValidate = Yup.object({
    category: Yup.string().required('Category is required'),
    name: Yup.string().required('Subcategory Name is required'),
    description: Yup.string().required('Description is required'),
  });
  