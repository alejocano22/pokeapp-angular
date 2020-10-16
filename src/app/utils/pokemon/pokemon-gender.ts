export const getGender = (rate: number): string => {
  let gender = 'Genderless';
  if (rate >= 4 ){
      gender = 'Female';
  } else if (rate >= 0){
      gender = 'Male';
  }
  return gender;
};
