def primes(n):
    sieve = [True] * n
    for i in range(3,int(n**0.5)+1,2):
        if sieve[i]:
            sieve[i*i::2*i]=[False]*((n-i*i-1)//(2*i)+1)
    return [2] + [i for i in range(3,n,2) if sieve[i]]

num_primes = int(input("How many primes: "))
p = primes(num_primes)
formatted = "".join(str(p))

file = open("primes.txt", "a")
file.write(formatted)
file.close()

