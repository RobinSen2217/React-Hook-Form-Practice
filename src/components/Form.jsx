import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function Form() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        instagram: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }], //by default one field
    },reValidateMode:'onSubmit'
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
    watch,
    getValues,
    setValue,
  } = form; //register fucntion allows us to register a form control with react hook form and we can track and control the input fields of the form as well as the form state

  // const dynamicVals=getValues('phNumbers')
  // console.log(dynamicVals)

  // useEffect(()=>{
  //   const subscription =watch((val)=>{
  //     console.log(val)
  //   })
  //   return () => subscription.unsubscribe()
  // },[watch])

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const { errors, isDirty, isValid,isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log(data);
    reset(); //resets all form fields
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate //Stops validation of the form by browser and lets RHF to handle it.
        className="flex flex-col items-center w-1/2 mx-auto gap-y-9 my-10 justify-center"
      >
        <div className="w-full">
          <label htmlFor="username" className="text-white text-xl">
            Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "Please enter a username",
              },
            })}
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            id="username"
            className="w-full focus:outline-none mt-2 px-3 py-2 text-white rounded-md text-lg bg-neutral-800"
          />
          <p className="text-red-500 text-lg">{errors.username?.message}</p>
        </div>
        <div className="w-full">
          <label htmlFor="email" className="text-white text-xl">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter an email address",
              },
              minLength: 3,
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, //Regex pattern for email addresses
                message: "Please enter a valid email address",
              },
              validate: {
                notAdmin: (val) => {
                  return (
                    val !== "admin@gmail.com" || "Enter different email address"
                  );
                },
              },
            })}
            id="email"
            className="w-full mt-2 px-3 focus:outline-none text-white text-lg rounded-md py-2 bg-neutral-800"
          />
          <p className="text-red-500 text-lg">{errors.email?.message}</p>
        </div>
        <div className="w-full">
          <label htmlFor="channel" className="text-white text-xl">
            Channel
          </label>
          <input
            type="text"
            {...register("channel", {
              required: {
                value: true,
                message: "Please enter a channel name",
              },
            })}
            id="channel"
            className="w-full mt-2 focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
          />
          <p className="text-red-500 text-lg">{errors.channel?.message}</p>
        </div>
        <div className="w-full">
          <label htmlFor="twitter" className="text-white text-xl">
            Twitter
          </label>
          <input
            type="text"
            {...register("social.twitter")} //since social is nested object in form state this is how we register twitter field which is part of nested object social
            id="twitter"
            className="w-full mt-2 focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
          />
        </div>

        <div className="w-full">
          <label htmlFor="instagram" className="text-white text-xl">
            Instagram
          </label>
          <input
            type="text"
            {...register("social.instagram")} //since social is nested object in form state this is how we register instagram field which is part of nested object social
            id="instagram"
            className="w-full mt-2 focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
          />
        </div>

        <div className="w-full">
          <label htmlFor="primary_phone" className="text-white text-xl">
            Primary Phone Number
          </label>
          <input
            type="tel"
            {...register("phoneNumbers[0]", {
              pattern: {
                value:
                  /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/, //Where phone number could be any of these formats: 555-555-5555 (555)555-5555 (555) 555-5555 555 555 5555 5555555555 1 555 555 5555
                message: "Please enter a valid phone number",
              },
            })} //since phoneNumbers is array in form state this is how we register primary phone number field which is part of array phoneNumbers.
            // This is done as phoneNumbers.0 in case of typescript
            id="primary_phone"
            className="w-full mt-2 focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
          />
        </div>
        <div className="w-full">
          <label htmlFor="secondary_phone" className="text-white text-xl">
            Secondary Phone Number
          </label>
          <input
            type="text"
            {...register("phoneNumbers[1]", {
              pattern: {
                value:
                  /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/, //Where phone number could be any of these formats: 555-555-5555 (555)555-5555 (555) 555-5555 555 555 5555 5555555555 1 555 555 5555
                message: "Please enter a valid phone number",
              },
            })} //since phoneNumbers is array in form state this is how we register secondary phone number field which is part of array phoneNumbers
            // This is done as phoneNumbers.1 in case of typescript
            id="secondary_phone"
            className="w-full mt-2 focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
          />
        </div>

        {/* Dynamic Inputs */}
        <div className="w-full mt-2">
          <label className="text-white text-xl">
            List of phone numbers(dynamic)
          </label>
          <div className="flex flex-col w-full gap-y-5 mt-2">
            {fields.map((field, ind) => {
              //RHF recommends using field.id as key instead of ind
              return (
                <div className="flex w-full flex-nowrap gap-x-2" key={field.id}>
                  <input
                    className="w-full focus:outline-none text-white px-3 rounded-md text-lg py-2 bg-neutral-800"
                    type="tel"
                    {...register(`phNumbers[${ind}].number`, {
                      pattern: {
                        value:
                          /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/, //Where phone number could be any of these formats: 555-555-5555 (555)555-5555 (555) 555-5555 555 555 5555 5555555555 1 555 555 5555
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {ind > 0 && ( //can't remove all fields, atleast one field has to be added
                    <button
                      className="text-white text-xl w-fit flex flex-nowrap items-center justify-center p-2 rounded-full hover:bg-neutral-900"
                      type="button"
                      onClick={() => remove(ind)}
                    >
                      <span className="text-2xl px-2 font-light bg-transparent text-red-500">
                        X
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
            <button
              className="text-white text-lg w-fit border mt-3 border-white gap-x-1 flex flex-nowrap items-baseline p-2 rounded-md"
              type="button"
              onClick={() => append({ number: "" })}
            >
              <span className="text-xl font-light">+ </span> Add Phone Number
            </button>
          </div>
        </div>

        <input
          disabled={!isDirty || !isValid || isSubmitting} //disables submit button if form is dirty or not valid,i.e.,has errors. Also disables submit button while form is in process of being submitted
          type="submit"
          value="Submit"
          className="py-2 px-3 mt-4 transition-colors duration-300 text-2xl disabled:cursor-default disabled:bg-gray-500 disabled:text-neutral-800  text-white bg-neutral-700 hover:bg-neutral-900 rounded-md w-full hover:cursor-pointer"
        />
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Form;
