#include <stdlib.h>
#include <stdio.h>

int MaximoR(int v[], int n)
{
    if(n == 1)
        return v[0];
    
    else
    {
     int x;
     x = MaximoR(v,n-1);
     if(x> v[n-1])
     {
         return x;
     }
     
     else
     {
         return v[n-1];
     }
     
    }
    
}


main(int argc, char const *argv[])
{
    /* code */
    int v[10];
    int n;
    n=10;
    
    for (int i = 0; i < 10; i++)
    {
        v[i] = i + 100; /* set element at location i to i + 100 */
    }
    for (int i = 0; i < 10; i++)
    {
       printf("Valor do vetor v[%d] =  %d \n ",i,v[i]);
    }

    int m = MaximoR(v,n);
    printf("Maximo é %d \n",m);

    return 0;
}
