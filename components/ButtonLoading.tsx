import ReactLoading from 'react-loading';

interface ButtonLoadingProps {
  loading: boolean;
  text: string;
  isSubmit: boolean;
  onClick?: () => {};
}

const ButtonLoading = ({
  loading,
  text,
  isSubmit = true,
  onClick,
}: ButtonLoadingProps) => (
  <button
    type={isSubmit ? 'submit' : 'button'}
    className='button-primary'
    onClick={onClick}
  >
    {loading ? (
      <div className='flex w-full justify-center'>
        <ReactLoading type='spin' color='#fff' height={30} width={30} />
      </div>
    ) : (
      <span>{text}</span>
    )}
  </button>
);

export { ButtonLoading };
