yarn install
yarn run build
mkdir -p .next/standalone/.next/static
cp -R .next/static/**  .next/standalone/.next/static
