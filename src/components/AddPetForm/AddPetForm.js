import { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
// import { useDispatch } from 'react-redux';
// import { addNotice } from 'Redux/notices/operation';
import validationSchema from './validationSchema';
import CategoryStep from 'components/AddPetForm/CategoryStep/CategoryStep';
import PersonalDetailsStep from 'components/AddPetForm/PersonalDetailsStep/PersonalDetailsStep';
import MoreInfoStep from 'components/AddPetForm/MoreInfoStep/MoreInfoStep';
import {
  FormContainer,
  FormTitle,
  Stepper,
  StepperItem,
} from './AddPetForm.styled';

const AddPetForm = () => {
  // const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const formikRef = useRef(null);

  const [formValues, setFormValues] = useState({
    category: selectedCategory,
    name: '',
    date: '',
    breed: '',
    avatar: '',
    sex: '',
    location: '',
    price: '',
    comments: '',
    title: '',
  });
  const steps = ['Choose Option', 'Personal Details', 'More Info'];

  const stepTitles = {
    1: 'Add pet',
    2: {
      'your-pet': 'Add my pet',
      sell: 'Add pet for sell',
      'lost-found': 'Add lost or found pet',
      'for-free': 'Add pet for adoption',
    },
    3: {
      'your-pet': 'Add my pet',
      sell: 'Add pet for sell',
      'lost-found': 'Add lost or found pet',
      'for-free': 'Add pet for adoption',
    },
  };

  // Function to handle category selection
  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      category: category,
    }));
  };

  const currentTitle =
    typeof stepTitles[step] === 'string' ? stepTitles[step] : ''; // code checks if stepTitles[step] is a string, and if it is, assigns it to currentTitle.  Otherwise, it assigns an empty string.

  const dynamicTitle =
    step > 1
      ? stepTitles[step][selectedCategory] || currentTitle
      : currentTitle;

  const handleNext = () => {
    setCompletedSteps([...completedSteps, step]);
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = values => {
    const formData = new FormData();
    const { resetForm } = formikRef.current;

    formData.append('categories', formValues.category);
    formData.append('name', values.name);
    formData.append('birthday', values.date);
    formData.append('breed', values.breed);
    formData.append('imageURL', values.avatar);
    formData.append('comments', values.comments);

    if (formValues.category === 'your-pet') {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // dispatch(addMyPet({category: 'my ads', formData}))
      resetForm();
      return;
    }

    formData.append('title', values.title);
    formData.append('sex', values.sex);
    formData.append('place', values.location);

    if (formValues.category === 'lost-found') {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      // dispatch(
      //   addNotice({ formData: { ...formData, categories: 'lost/found' } })
      // );

      resetForm();
      return;
    }

    if (formValues.category === 'for-free') {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // dispatch(addNotice({ category: 'in good hands', formData }));
      resetForm();
      return;
    }

    formData.append('price', values.price);

    if (formValues.category === 'sell') {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // dispatch(addNotice({ category: 'sell', formData }));
      resetForm();
      return;
    }
  };

  const renderStepContent = step => {
    switch (step) {
      case 1:
        return (
          <CategoryStep
            onNext={handleNext}
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        );
      case 2:
        return (
          <PersonalDetailsStep
            onBack={handleBack}
            onNext={handleNext}
            selectedCategory={selectedCategory}
            setFormValues={setFormValues}
          />
        );
      case 3:
        return (
          <MoreInfoStep
            onBack={handleBack}
            selectedCategory={selectedCategory}
            setFormValues={setFormValues}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormContainer step={step}>
      <FormTitle>{dynamicTitle}</FormTitle>
      <Stepper>
        {steps.map((name, index) => (
          <StepperItem
            key={index}
            className={
              step === index + 1
                ? 'active'
                : completedSteps.includes(index + 1)
                ? 'completed'
                : ''
            }
          >
            {name}
          </StepperItem>
        ))}
      </Stepper>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ values }) => <Form>{renderStepContent(step)}</Form>}
      </Formik>
    </FormContainer>
  );
};

export default AddPetForm;
