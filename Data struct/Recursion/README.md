# Recursion


Many computational problems have the following property: Each instance of the problem contains a smaller instance of the same problem.
We can call recursion this structure ...

### Pseudo-código

If the instance is small then solve the problem
If no
	reduce it to a lesser extent of the same problem,
	apply the method to the smaller instance
	and return to the original instance

#### Código

Consider a problem to determine the value of a maximum element of a vector v [0..n-1].
The size of an instance of the problem is n. Of course, the problem only makes sense if the vector is not empty, that is,
if n> = 1. If n = 1, then v [0] is the largest.
If n> 1 then we can look to reduce this problem to small problems as we show in the code


This was the first one when I did I had not switched to C ++
<a href="https://github.com/matheusfrancisco/algorithms/blob/master/Recursion/recursion.c">Recurison.c</a>

